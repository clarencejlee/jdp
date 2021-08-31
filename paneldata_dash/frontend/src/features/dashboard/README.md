## dashboard

### CsvUpload
Page for uploading a CSV file to process and prepopulate the data. It has one redux action: uploadCsv which is executed after uploading the file.
While the file is being uploaded,  Loading component is active with the spinner. Upon completion of uploading the file the message is displayed for the user

### Dashboard
Landing dashboard page which contains a route switch. Depending on the url user can navigate to Data page (page with markets, categories etc), Upload page, and SQL page.

### Dataselector
Here we can find Dataselector.jsx - a main container and two sub pages: Data.jsx and Summary.jsx. DataSelector is a container for Data which can load data for markets, categories,
brands, facts, periods, depending which one is selected
Summary.jsx is just a functional component where the selected data is presented in dropdowns with option to reset the data from the current view and export a CSV
by clicking on the OK button.

### SQL
Page for executing custom sql query and exporting csv data based on custom query. It has two actions:getCustomQueryData, customQueryCsvExport. The data from the 
query will be displayed in TableContainer, a component from Material-UI.
 
