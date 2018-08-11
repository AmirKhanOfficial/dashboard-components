/*
* This Component is used for custom Datatable
*
* Params
* Name                      Type            Default         Description
* showTotalValue            String                          Total count of items which you are going to display
* list                      Array                           Required. List of the Item which you are going to display
* actionField               Boolean         False           Adds Actions buttons field in table.
* actionsList               Array                           Contains total actions your want to perform with Action Field(contains Icon and EventHandler Function)
* search                    Boolean         True            Show Search Filter on Top of the Table
* placeholder               String          Search here...  Placeholder of Search Input Field
* pagination                Boolean         True            Show Pagination on the bottom of the Datatable
* perPage                   Number          10              Count of items per page
* defaultActivePage         Number          1               Default Active Page
* pageRangeDisplayed        Number          3               Range of pages in paginator, exclude navigation blocks (prev, next, first, last pages)
* sort                      Boolean         True            Sort by any of the list item
* headerList                Array                           Table Header List(Contains the fields you want to show in your datatable)
* serialNumber              Boolean         True            Shows the Sno. field in header
* noDataMessage             String          No Data Found.  When Data Table is empty this message will be displayed.
*
* */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Thead from "./Thead";
import Tbody from "./Tbody";
import Pagination from 'react-js-pagination'
import './datatable.css'


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: (props.search === false) ? false : true,
            sort: (props.sort === false) ? false : true,
            pagination: (props.pagination === false) ? false : true,
            placeholder: props.placeholder || "Search here...",
            searchQuery: '',
            sortedBy: '',
            activePage: props.defaultActivePage || 1,
            perPage: props.perPage || 10,
            pageRangeDisplayed: props.pageRangeDisplayed || 3,
            actionField: (props.actionField === false) ? false : true,
            isAsc: false,
            serialNumber: (props.serialNumber === false) ? false : true
        };
        this.handleOutsideClick = this.handleOutsideClick.bind(this)
    }

    componentDidMount() {
        if(this.state.pagination) {
            window.addEventListener('click', this.handleOutsideClick, true);
        }
    }

    handleOutsideClick(e) {
        if (document.querySelector('.per-page-select label').contains(e.target) || document.querySelector('.per-page-select input').contains(e.target)) {
        } else {
            document.querySelector('.per-page-select ul').style.display = 'none';
        }
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleOutsideClick, true);
    }

    handleSearch(value) {
        this.setState({searchQuery: value, activePage: 1});
    }

    handleSortedBy(field, e) {
        if (field === this.state.sortedBy) {
            this.setState({sortedBy: field, isAsc: !this.state.isAsc})
        }
        else {
            this.setState({sortedBy: field, isAsc: false})
        }
        if(document.querySelector('.data-table-thead th.sorted') !== null){
            document.querySelector('.data-table-thead th.sorted').classList.remove('sorted');
        }
        e.currentTarget.classList.add('sorted');
        const allIcons = document.querySelectorAll(".data-table-thead th .material-icons");
        for (let i = 0; i < allIcons.length; i++) {
            if ((e.currentTarget.children[1].children[0] !== allIcons[i]) && (e.currentTarget.children[1].children[1] !== allIcons[i])) {
                allIcons[i].classList.remove('active');
            }
        }
        if ((!e.currentTarget.children[1].children[0].classList.contains('active')) && (!e.currentTarget.children[1].children[1].classList.contains('active'))) {
            e.currentTarget.children[1].children[0].classList.add('active');
        } else {
            e.currentTarget.children[1].children[0].classList.toggle('active');
            e.currentTarget.children[1].children[1].classList.toggle('active');
        }
    }

    sortList(a, b, sortedBy, isAsc) {
        let first, second;
        if (isNaN(a[sortedBy])) {
            first = a[sortedBy].toString().toLowerCase();
            second = b[sortedBy].toString().toLowerCase();
        } else {
            first = a[sortedBy];
            second = b[sortedBy];
        }
        if (isAsc) {
            if (first < second)
                return 1;
            if (first > second)
                return -1;
            return 0
        }
        else {
            if (first < second)
                return -1;
            if (first > second)
                return 1;
            return 0;
        }
    }

    filterBySearch(query) {
        return (item) => (Object.values(item).filter((name) => (name.toString().toLowerCase()
            .indexOf(query.toLowerCase()) !== -1) ? true : false).length > 0) ? true : false;
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    changePerPage(value) {
        this.setState({perPage: value, activePage: 1})
    }

    handleSelectChange(e) {
        document.querySelector('.per-page-select ul').style.display = 'none';
        let value = e.target.value;
        if (e.target.value === '') {
            value = 0;
        }
        this.changePerPage(parseInt(value))
    }

    handleLabelClick() {
        document.querySelector('.per-page-select ul').style.display = 'block';
    }

    render() {
        return (
            <div className="data-table">
            <div className="data-table-header">
            {this.state.search &&
            <div className="search-query-box">
            <input className="search-input" placeholder={this.state.placeholder}
        value={this.state.searchQuery} onChange={(e) => this.handleSearch(e.target.value)}/>
        {this.state.searchQuery.length === 0 ? <i className="material-icons">search</i> :
            <i className="material-icons" onClick={(e) => this.handleSearch('')}>close</i>}
        </div>
        }
        {this.props.showTotalValue &&
        <div className="total-count">
            <strong>Total {this.props.showTotalValue} : </strong> {this.props.list.length}
        </div>}
        </div>
        <table cellSpacing={0} cellPadding={0}>
            <Thead headerList={this.props.headerList}
            serialNumber={this.state.serialNumber}
            handleSortedBy={this.handleSortedBy.bind(this)}
            actionField={this.state.actionField}
            sort={this.state.sort}/>
        <Tbody sortedBy={this.state.sortedBy}
            list={this.props.list}
            searchQuery={this.state.searchQuery}
            filterBySearch={this.filterBySearch}
            activePage={this.state.activePage}
            perPage={this.state.perPage}
            isAsc={this.state.isAsc}
            actionField={this.state.actionField}
            sortList={this.sortList}
            headerList={this.props.headerList}
            actionsList={this.props.actionsList}
            noDataMessage={this.props.noDataMessage}
            pagination={this.state.pagination}
            />
            </table>
            {this.state.pagination &&
            < div className="data-table-pagination">
                <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.perPage}
                totalItemsCount={((this.state.sortedBy !== '') ?
                    this.props.list.filter(this.filterBySearch(this.state.searchQuery)).sort((a, b) =>
                        this.sortList(a, b, this.state.sortedBy, this.state.isAsc)).length :
                    this.props.list.filter(this.filterBySearch(this.state.searchQuery)).length)}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                onChange={this.handlePageChange.bind(this)}
                />
                <div className="per-page-select"
                style={{display: (this.props.list.length > 0 ? 'inline-block' : 'none')}}>
            <input type="number" id="select-input" minLength={0}
                value={this.state.perPage.length > 1 ? this.state.perPage.toString().replace(/^0+/, '') : this.state.perPage}
                onChange={this.handleSelectChange.bind(this)}/>
            <label htmlFor="select-input"
                onClick={this.handleLabelClick.bind(this)}>{this.state.perPage}</label>
            <ul>
            <li onClick={(e) => this.changePerPage(15)}>15</li>
                {this.props.list.length > 25 && <li onClick={(e) => this.changePerPage(25)}>25</li>}
                    {this.props.list.length > 50 && <li onClick={(e) => this.changePerPage(50)}>50</li>}
                    <li onClick={(e) => this.changePerPage(this.props.list.length)}>All</li>
                    </ul>
                    </div>
                    </div>
                    }
                </div>
                )
    }
}

DataTable.propTypes = {
    showTotalValue: PropTypes.string,
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired,
    defaultActivePage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
    perPage: PropTypes.number,
    headerList: PropTypes.array,
    pagination: PropTypes.bool,
    actionField: PropTypes.bool,
    actionsList: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        handleAction: PropTypes.func
    })),
    sort: PropTypes.bool,
    search: PropTypes.bool,
    serialNumber: PropTypes.bool,
    noDataMessage: PropTypes.string
};

export default DataTable;