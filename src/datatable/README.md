# DataTable
**A ReactJS component to render a datatable.**
The component comes with built-in styles.
### Installation
Install DataTable with npm:
```sh
$ npm install --save dashboard-components
```

### Usage
Very easy to use. Just provide props with total amount of things that you want to display on the page.

```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {DataTable} from "dashboard-components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
      {name:'Bob', age:24, location: 'America'},
      {name:'Jack', age:32, location: 'Australia'},
      {name:'Daniel', age:45, location: 'Dubai'},
      {name:'Harry', age:37, location: 'Canada'},
      {name:'David', age:25, location: 'Africa'},
      {name:'Kim Johnson', age:34, location: 'Paris'}
      ],
      headerList: [
      {label:'Name',value: 'name', sort: true, style: {minWidth:'75px'}},
      {label:'Age',value: 'age'},
      {label:'Location',value: 'location', sort: true, style: {fontWeight:'bold'}}
      ]
    };
  }

  handleEdit(obj){
    console.log(obj)
  }
  handleDelete(obj){
    console.log(obj)
  }

  render() {
    return (
      <div>
        <DataTable  list={this.state.data}
                    showTotalValue={'Users'}
                    placeholder={'Search by Name'}
                    headerList={this.state.headerList}
                    serialNumber={true}
                    noDataMessage={"No Users Found"}
                    sort={true}
                    actionField={true}
                    actionsList={[
                        {icon:'edit',handleAction: this.handleEdit},
                        {icon:'delete',handleAction: this.handleDelete}
                    ]}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

```

### Params

| Name | Type | Default | Description |
| --- | --- | :---: | --- |
| showTotalValue | String |    | Total count of items which you are going to display
| list | Array |    | **Required.** List of the Item which you are going to display
| actionField | Boolean  | False | Adds Actions buttons field in table.
| actionsList  | Array |    | Contains total actions your want to perform with Action Field(contains Icon(**Required.**) and EventHandler Function)
| search | Boolean | True | Show Search Filter on Top of the Table
| placeholder | String | Search here... | Placeholder of Search Input Field
| pagination | Boolean | True | Show Pagination on the bottom of the Datatable
| perPage | Number | 10 | Count of items per page
| defaultActivePage | Number | 1 | Default Active Page
| pageRangeDisplayed | Number | 3 | Range of pages in paginator, exclude navigation blocks (prev, next, first, last pages)
| sort | Boolean | True | Sort by any of the list item
| headerList | Array |   | Table Header List(Contains the fields you want to show in your datatable)
| serialNumber | Boolean | True | Shows the Sno. field in header
| noDataMessage | String | No Data Found. | When Data Table is empty this message will be displayed.

### Using the icons
This project uses [Google Material Icons](https://material.io/tools/icons/). You have to link the script in your html file to display the icons.
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
Read more in the [font portion](https://google.github.io/material-design-icons/#icon-font-for-the-web) of google developer guide.

### Pagination
This component uses [react-js-pagination](https://www.npmjs.com/package/react-js-pagination).
