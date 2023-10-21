import express from 'express';
import events from '../Controllers/event';

// auth middlewares for admin
import isAdminMiddleware from '../Middlewares/isManager';
// auth middleware for user
import isLoggedInUser from '../Middlewares/loggedIn';
// validations
import eventValidator from '../validations/event';


const eventRouter = express.Router();

eventRouter.post(
	'/addEvent',
	isAdminMiddleware.isManagerOwner,
	eventValidator.addEvent,
	events.addEvent,
);

eventRouter.get('/getAllProduct',events.getEvents);

eventRouter.get('/getSingleProduct/:id', events.getSingleEvent);
eventRouter.get('/getAllUser', isAdminMiddleware.isManagerOwner, events.getAllUsers);
eventRouter.get('/getCart',isLoggedInUser.isLoggedIn, events.getCart);

// only admin can delete
eventRouter.delete(
	'/delete/:id',
	isAdminMiddleware.isManagerOwner,
	events.deleteEvent,
);


eventRouter.patch('/editProduct/:id',
isAdminMiddleware.isManagerOwner, events.editEvent);


  eventRouter.post(
	'/postSale',
	isAdminMiddleware.isManagerOwner,
	events.postSale,
  );

  eventRouter.patch(
	'/editSalesProduct/:id',
	isAdminMiddleware.isManagerOwner,
	events.editSales
  );

  eventRouter.get(
  '/allOrders',
  isAdminMiddleware.isManagerOwner,
  events.getAllOrders
);

eventRouter.patch(
	'/updateUser/:id',
	isLoggedInUser.isLoggedIn,
	events.updateUserSettings
  );

  eventRouter.post(
	'/postCart',
	events.AddToCart
  );

  eventRouter.post(
	'/postWishList',
	events.addToWishList
  );

  eventRouter.post(
	'/buyNow',
	isLoggedInUser.isLoggedIn,
	events.buyItem
  );

  eventRouter.post(
	'/payment',
	isLoggedInUser.isLoggedIn,
	events.addPayment
  );

  eventRouter.post(
	'/postNotification',
	isAdminMiddleware.isManagerOwner,
	events.postNotifications
  );
  

export default eventRouter;
