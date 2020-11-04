const buildNotification = (notificationType, data) => {
    newNotificaiton = {
        creationDate: new Date(),
        lastEditDate: new Date(),
        type: notificationType,
        content: {},
        url: "",
        imageUrl: "",
        title: "",
        description: "",
        icon: ""
      }

    switch(notificationType) {
        case 'meetCreated':
            newNotificaiton.url = '/meets/' + data._id;
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Created";
            newNotificaiton.description = data.title + " Meet has been created and is pending review by the CPL.";
            newNotificaiton.icon = "fitness_center";
            break;
        case 'meetAccepted':
            newNotificaiton.url = '/meets/' + data._id;
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Accepted";
            newNotificaiton.description = data.title + " Meet has been accepted and is pending fee payment.";
            newNotificaiton.icon = "fitness_center";
            break;
        case 'meetRemoved':
            newNotificaiton.url = '/meets/' + data._id;
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Removed";
            newNotificaiton.description = data.title + " Meet has been removed.";
            newNotificaiton.icon = "fitness_center";
            break;
        case 'meetRegistrationOpened':
            newNotificaiton.url = '/meets/' + data._id;
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Registration Has Opened";
            newNotificaiton.description = "Registration has opened for " + data.title + ".";
            newNotificaiton.icon = "fitness_center";
            break;
        case 'meetReleased':
            newNotificaiton.url = '/meets/' + data._id;
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Released";
            newNotificaiton.description = data.title + " Meet has been created and is pending review by the CPL.";
            newNotificaiton.icon = "fitness_center";
            break;
        case 'meetCompleted':
            newNotificaiton.url = '/meets/' + data._id;
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Complete";
            newNotificaiton.description = data.title + " Meet has been completed.";
            newNotificaiton.icon = "fitness_center";
            break;
        case 'resultsUploaded':
            newNotificaiton.url = '/meets/' + data._id + "/results";
            newNotificaiton.imageUrl = data.images.length > 0 ? data.images[0] : "";
            newNotificaiton.title = data.title + " Results Uploaded";
            newNotificaiton.description = "Results for " + data.title + " have been uploaded.";
            newNotificaiton.icon = "format_list_numbered";
            break;
        case 'resultsUpdated':
            break;
        case 'recordsUploaded':
            break;
        case 'recordsUpdated':
            break;
        case 'coordinatorCreated':
            break;
        case 'coordinatorDeleted':
            break;
        case 'coordinatorMeetFeePaid':
            break;
        case 'memberCreated':
            break;
        case 'memberRenewedSubscription':
            break;
        case 'memberRegisteredForMeet':
            newNotificaiton.url = '/meets/' + data.meetId;
            newNotificaiton.title = data.memberId + " Registered for meet " + data.meetId;
            newNotificaiton.description = "";
            newNotificaiton.icon = "person";
            break;
        case 'memberDeactivated':
            break;
        case 'officialAdded':
            break;
        case 'officialRemoved':
            break;
        
        default:
            break;
    }
    return newNotificaiton;
}

module.exports = {
    buildNotification
}