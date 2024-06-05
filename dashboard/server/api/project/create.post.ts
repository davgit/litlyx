import { ProjectModel, TProject } from "@schema/ProjectSchema";
import StripeService from '~/server/services/StripeService';

export default defineEventHandler(async event => {

    const body = await readBody(event);

    const newProjectName = body.name;

    if (!newProjectName) return setResponseStatus(event, 400, 'ProjectName too short');
    if (newProjectName.length < 2) return setResponseStatus(event, 400, 'ProjectName too short');

    const userData = getRequestUser(event);
    if (!userData?.logged) return setResponseStatus(event, 400, 'NotLogged');

    const existingUserProjects = await ProjectModel.countDocuments({ owner: userData.id });
    if (existingUserProjects == 3) return setResponseStatus(event, 400, 'Already have 3 projects');

    const customer = await StripeService.createCustomer(userData.user.email);
    if (!customer) return setResponseStatus(event, 400, 'Error creating customer');

    const subscription = await StripeService.createFreeSubscription(customer.id);
    if (!subscription) return setResponseStatus(event, 400, 'Error creating subscription');

    const project = await ProjectModel.create({
        owner: userData.id,
        name: newProjectName,
        premium: false,
        premium_type: 0,
        customer_id: customer.id,
        subscription_id: subscription.id,
        premium_expire_at: subscription.current_period_end * 1000
    });


    return project.toJSON() as TProject;

});