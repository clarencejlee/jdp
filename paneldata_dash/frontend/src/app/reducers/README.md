# reducers
Here we combine all reducers into single, root reducer. Reducers currently in use are: dataReducer, modalReducer, navReducer, 
tostrReducer, asyncReducer.
These reducers are handling corresponding actions for data, modals navigation etc. For example tostrReducer is responsible for processing
actions for displaying messages to user. An example of that message is a notification when CSV is processed successfully on the /dashboard/upload
page.
