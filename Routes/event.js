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
	'/addProduct',
	isLoggedInUser.isLoggedIn,
	eventValidator.addEvent,
	events.addEvent,
);

eventRouter.get('/getAllProduct',events.getEvents);

eventRouter.get('/getSingleEvent/:id', events.getSingleEvent);

// only admin can delete
eventRouter.delete(
	'/delete/:id',
	isAdminMiddleware.isManagerOwner,
	events.deleteEvent,
);

eventRouter.patch(
	'/edit/:id',
	isAdminMiddleware.isManagerOwner,
	events.editSales
  );

eventRouter.patch('/editProduct/:id',
isAdminMiddleware.isManagerOwner, events.editEvent);

eventRouter.post(
    '/category',
    isAdminMiddleware.isManagerOwner,
	events.addCategory
  );

  eventRouter.post(
	'/postSale',
	isAdminMiddleware.isManagerOwner,
	events.postSale,
  );

  eventRouter.patch(
	'/edit/:saleId',
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
