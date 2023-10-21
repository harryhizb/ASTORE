/* eslint-disable no-shadow */

import status from 'http-status';
import stripePackage from 'stripe';
import EventSchema from '../Models/eventSchema';
import Buy from '../Models/buySchema';
import PaymentSchema from '../Models/PaymentSchema';
import Notification from '../Models/notificationSchema';
import userSchema from '../Models/userSchema';
import Cart from '../Models/cartListSchema';
import WishList from '../Models/wishListSchema';
import Offer from '../Models/offerSchema';
import Order from '../Models/orderSchema';


 

const getEvents = (req, res) => {
	EventSchema.find()
	  .then(events => {
		res.status(status.OK).send(events);
	  })
	  .catch(err => {
		res.status(status.INTERNAL_SERVER_ERROR).send({
		  Message: 'Not Available at the moment ',
		  err,
		});
	  });
  };
  
const addEvent = (req, res) => {
	const { name, price, description, imageUrl, weight, category } = req.body;
  
	const event = new EventSchema({
	  name,
	  price,
	  description,
	  imageUrl,
	  weight,
	  category,
	  addedBy: req.user_id, 
	});
  
	event
	  .save()
	  .then(savedEvent => {
		res.status(status.OK).send({
		  savedEvent,
		  Message: ' product added Successfully',
		  type: status.OK,
		});
	  })
	  .catch(err => {
		res.status(status.INTERNAL_SERVER_ERROR).send({
		  Message: status.INTERNAL_SERVER_ERROR,
		  err,
		});
	  });
  };
  

  const deleteEvent = (req, res) => {
	const { id } = req.params;
	EventSchema.findByIdAndRemove(id, (err, result) => {
		if (result) {
			res.status(status.OK).send({
				Message: 'product Deleted Successfully.',
			});
		} else {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Unable to Delete.',
				err,
			});
		}
	});
};

const editEvent = (req, res) => {
	const { id } = req.params;
	const query = { $set: req.body };
	EventSchema.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
		if (err) {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Unable to Update.',
			});
		} else {
			res.status(status.OK).send({
				Message: 'Successfully Updated.',
				result,
			});
		}
	});
};

const getSingleEvent = (req, res) => {
	const { id } = req.params; // Assuming the city is passed as a parameter

	EventSchema.findOne({_id:id})
	  .then (product => {
	  if (product) {
		res.status(status.OK).send(product);
	  } else {
		res.status(status.NOT_FOUND).send({
		Message: 'user not found.',
		});
	  }
	  })
	  .catch(err => {
	  console.log(err);
	  res.status(status.INTERNAL_SERVER_ERROR).send({
		Message: 'Internal server error',
		Error: err,
	  });
	  });
	};
  
  

const buyItem = async (req, res) => {
		try {
		  const { itemId, quantity, price } = req.body; // Assuming you send these fields in the request body
	  
		  // Validate the request data
		  if (!itemId || !quantity || !price) {
			return res.status(400).json({ error: 'Please provide itemId, quantity, and price.' });
		  }
	  
		  // Create a new Buy document
		  const buy = new Buy({
			itemId,
			quantity,
			price,
		  });
	  
		  // Save the Buy document to the database
		  const savedBuy = await buy.save();
	  
		  // Respond with the saved Buy document
		  return res.status(201).json(savedBuy);
		} catch (error) {
		  console.error('Error buying item:', error);
		  return res.status(500).json({ error: 'Internal Server Error' });
		}
	  };

const postNotifications = async (req, res) => {
		try {
		  const { notificationName, notification } = req.body;
	  
		  // Assuming that your notificationSchema model includes the fields 'notificationName' and 'notification'
		  const snowDrops = new Notification({
			notificationName,
			notification,
		  });
	  
		  const savedNotification = await snowDrops.save();
	  
		  res.status(200).json(savedNotification);
		} catch (error) {
		  console.error('Error saving events:', error);
		  res.status(500).json({
			message: 'Error saving events',
			error: error.message, // Include the error message for debugging purposes
		  });
		}
	  };

	  const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
	
	  const addPayment = async (req, res) => {
		try {
		  const { amount, currency } = req.body;
	  
		  // Create a payment intent
		  const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types: ['card'],
		  });
	  
		  // Create a new PaymentSchema instance and save it to your database
		  const payment = new PaymentSchema({
			paymentIntentId: paymentIntent.id,
			amount: paymentIntent.amount,
			currency: paymentIntent.currency,
			paymentStatus: paymentIntent.status,
		  });
	  
		  await payment.save();
	  
		  // Send a success response to the client
		  res.status(200).send({
			clientSecret: paymentIntent.client_secret,
			message: 'Payment deducted successfully',
		  });
		} catch (err) {
		  // Handle errors and send an error response to the client
		  console.error('Payment Error:', err);
		  res.status(500).send({
			message: 'Internal server error',
			error: err.message,
		  });
		}
	  };

const updateUserSettings = async (req, res) => {
		const { id } = req.params; // Assuming the user ID is passed as a parameter
	  
		try {
		  const user = await userSchema.findOne({ _id: id });
	  
		  if (user) {
			// Assuming you want to update user settings with data from the request body
			user.set(req.body);
			const updatedUser = await user.save();
	  
			res.status(status.OK).send(updatedUser);
		  } else {
			res.status(status.NOT_FOUND).send({
			  Message: 'User not found.',
			});
		  }
		} catch (error) {
		  console.error('Error updating user settings:', error);
		  res.status(status.INTERNAL_SERVER_ERROR).send({
			Message: 'Internal server error',
			Error: error,
		  });
		}
	  };
	  
	  
	  
	  

const AddToCart = (req, res) => {
		const { user, event, quantity } = req.body; // Assuming you have user and event IDs and optional quantity in the request body
	  
		const cartItem = new Cart({
		  user,
		  event,
		  quantity: quantity || 1, // Default quantity if not specified
		});
	  
		cartItem
		  .save()
		  .then(savedCartItem => {
			res.status(status.OK).send({
			  savedCartItem,
			  Message: 'Cart item added successfully',
			  type: status.OK,
			});
		  })
		  .catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
			  Message: 'Internal Server Error',
			  error: err,
			});
		  });
	  };
	  
		 
const addToWishList = (req, res) => {
		const { user, event } = req.body;
	  
		const wishListItem = new WishList({
		  user,
		  event,
		});
	  
		wishListItem
		  .save()
		  .then(savedWishListItem => {
			res.status(status.OK).send({
			  savedWishListItem,
			  Message: 'Wishlist item added successfully',
			  type: status.OK,
			});
		  })
		  .catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
			  Message: 'Internal Server Error',
			  error: err,
			});
		  });
	  };
	  
	  // Assuming you have the WishList schema defined as you provided.
		  

const postSale = (req, res) => {
				try {
				  const { title, description,  } = req.body;
			
				  const sale = new Offer({
					title,
					description,
				  });
			
				  sale
					.save()
					.then(savedsale=> {
					  res.status(status.OK).send({
						savedsale,
						Message: 'offer Added Successfully',
						type: status.OK,
					  });
					});
				} catch (err) {
					console.log(err);
				  res.status(status.INTERNAL_SERVER_ERROR).send({
					Message: 'Internal Server Error',
					error: err,
				  });
				}
			  };


const editSales = async (req, res) => {
				const { id } = req.params;
			
				try {
				  // Find the sale by its ID
				  const sale = await Offer.findById(id);
			
				  if (!sale) {
					// Return a 404 response with a message indicating that the sale was not found
					return res.status(404).json({ success: false, message: 'Sale not found' });
				  }
			
				  // Update the existing sale's settings with the provided data
				  sale.set(req.body);
				  await sale.save();
			
				  res.status(200).json({ success: true, message: 'Sale settings updated', data: sale });
				} catch (error) {
				  console.error('Error updating sale settings:', error);
				  res.status(500).json({ success: false, message: 'Failed to update sale settings' });
				}
			  };


const getAllOrders = async (req, res) => {
				try {
				  const orders = await Order.find().populate('customer').populate('products.product');
				  // Use the `populate` method to populate the references to 'customer' and 'products.product'
			  
				  res.status(200).json({
					orders,
				  });
				} catch (error) {
				  console.error('Error fetching orders:', error);
				  res.status(500).json({
					message: 'Internal Server Error',
					error: error.message,
				  });
				}
			  };
 const getAllUsers = (req, res) => {
				userSchema.find()
				  .then(users => {
					res.status(status.OK).send(users);
				  })
				  .catch(err => {
					res.status(status.INTERNAL_SERVER_ERROR).send({
					  Message: 'Unable to fetch users',
					  err,
					});
				  });
			  };
			  
			  

		export default {
			getAllUsers,
			postSale,
			addToWishList,
			AddToCart ,
			updateUserSettings,
			addPayment,
			buyItem,
			postNotifications,
			getEvents,
			addEvent,
			deleteEvent,
			editEvent,
			getSingleEvent,
			editSales,
			getAllOrders,
		  };