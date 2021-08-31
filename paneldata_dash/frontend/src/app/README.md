## app folder

App folder under src folder contains base or foundation stuff across all of the features of our app.
currently there are six sub folders: common, config, data, layout, reducers, store


### common
Common is where we store shared components for our app. This means that we can reuse those components
whenever we want. Example of those shared components are: Screen Capture feature (we are using it on screenshot modal),
Styled Tables (Data from markets, categories etc are displayed using this table)

### config
We could store all configuration in this folder. Currently its empty but we could use it, for example to configure some third party parameters
such as firebase or firestore.

### data
Contains sample data for deployment purposes. This is useful to have when we dont have backend in place.

### layout
Folder to store default layouts for the app. For this specific app we have base component App, where all other components
are loaded and Loading component - a spinner when we have a async call to fetch the data.

### reducers and store
Configuration for store and combining all reducers in one place. We are using redux pattern to determine changes in application state.

