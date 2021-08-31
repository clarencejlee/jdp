## features folder

features folder next to app folder under src is where we store all of our features
currently there are six sub folders: async, dashboard, home, modals, nav


### async
Async actions, constants and reducers for dispatching an action to indicate async actions.

### home
We have a HomePage layout stored here. Currently it has only a link to dashboard. This is the landing page of the app.

### modals

We store here all of or modals. Currently we have: Info modal, Prompt Modal and Screenshot modal. Info modal is used when we need to display a message to a user.
Prompt modal is used to give an option to user to cancel current action or to proceed with the given action. An example of the use of this modal is when user wants to
navigate from the page without updating the data. Screenshot modal is used to provide a feedback form with options to send a message and take a screenshot.

### nav

In nav folder we are keeping all stuff related to navigation. So far there is a left sidebar and a default dashboard navigation.

### dashborad

Dashboard is the main feature of the app and it contains four main modules: Csv upload, data selector, sql and landing dashboard page.
Csv upload page has only one button to select a csv file and upload it to populate data. Currently it is not available on side bar but you can access
it through :/dashboard/upload
Data selector a container page for Markets, Brands, Categories, Periods and Facts. It also contains sub pages for summary and a page to display data in tables for:
markets, brands, categories, periods, facts and all the filters currently available.
SQL page allows to create custom query and fetch the data from the database and eventually export it through CSV file.
