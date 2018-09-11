import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tbody extends Component {
    render() {
        return (
            <tbody className="data-table-tbody">
            {(this.props.pagination && (this.props.sortedBy !== '')) ?
                (this.props.list.filter(this.props.filterBySearch(this.props.searchQuery)).map((d, i) => {
                    d.sno = i + 1;
                    return d
                }).sort((a, b) => this.props.sortList(a, b, this.props.sortedBy, this.props.isAsc)).slice(((this.props.activePage * this.props.perPage) - this.props.perPage), (this.props.activePage * this.props.perPage)).map((d, i) => (
                    <tr key={i}>
                        {this.props.serialNumber && <td>{d.sno}</td>}
                        {this.props.headerList.map((data, index) =>
                            <td key={index} onClick={()=>this.props.handleRowClick(d)}>{d[data.value]}</td>
                        )}
                        {this.props.actionField  &&
                        <td>
                            {this.props.actionsList.map((item, indx) =>
                                <i key={indx} className={"material-icons "+ (item.type === 'link'?
                                    'dt-action-link ': item.type === 'icon'? ' dt-action-icon ': 'dt-action-button')}
                                   onClick={() => item.handleAction(d)}>{item.label? item.label : item.icon}</i>
                            )}
                        </td>
                        }
                    </tr>
                ))) :
                (this.props.pagination && (this.props.sortedBy === '') ?
                        (this.props.list.filter(this.props.filterBySearch(this.props.searchQuery)).map((d, i) => {
                            d.sno = i + 1;
                            return d
                        }).slice(((this.props.activePage * this.props.perPage) - this.props.perPage), (this.props.activePage * this.props.perPage)).map((d, i) => (
                            <tr key={i}>
                                {this.props.serialNumber && <td>{d.sno}</td>}
                                {this.props.headerList.map((data, index) =>
                                    <td key={index} onClick={()=>this.props.handleRowClick(d)}>{d[data.value]}</td>
                                )}
                                {this.props.actionField &&
                                <td>
                                    {this.props.actionsList.map((item, indx) =>
                                        <i key={indx} className={"material-icons "+ (item.type === 'link'?
                                            'dt-action-link ': item.type === 'icon'? ' dt-action-icon ': 'dt-action-button')}
                                           onClick={() => item.handleAction(d)}>{item.label? item.label : item.icon}</i>
                                    )}
                                </td>
                                }
                            </tr>
                        ))) :
                        (this.props.list.filter(this.props.filterBySearch(this.props.searchQuery)).map((d, i) => {
                            d.sno = i + 1;
                            return d
                        }).map((d, i) => (
                            <tr key={i}>
                                {this.props.serialNumber && <td>{d.sno}</td>}
                                {this.props.headerList.map((data, index) =>
                                    <td key={index} onClick={()=>this.props.handleRowClick(d)}>{d[data.value]}</td>
                                )}
                                {this.props.actionField &&
                                <td>
                                    {this.props.actionsList.map((item, indx) =>
                                        <i key={indx} className={"material-icons "+ (item.type === 'link'?
                                            'dt-action-link ': item.type === 'icon'? ' dt-action-icon ': 'dt-action-button')}
                                           onClick={() => item.handleAction(d)}>{item.label? item.label : item.icon}</i>
                                    )}
                                </td>
                                }
                            </tr>
                        )))
                )}
            {(this.props.sortedBy === '') ? (this.props.list.filter(this.props.filterBySearch(this.props.searchQuery)).slice(((this.props.activePage * this.props.perPage) - this.props.perPage), (this.props.activePage * this.props.perPage)).length === 0 &&
                    <tr>
                        <td colSpan={(this.props.serialNumber && this.props.actionField) ?(this.props.headerList.length + 2):
                            (
                                (this.props.serialNumber && !this.props.actionField)||(!this.props.serialNumber && this.props.actionField)
                            ) ?
                                (this.props.headerList.length+1):this.props.headerList.length}
                            className="no-data">{this.props.noDataMessage ? this.props.noDataMessage : "No Data Found."}</td>
                    </tr>
                ) :
                (this.props.list.filter(this.props.filterBySearch(this.props.searchQuery)).sort((a, b) => this.props.sortList(a, b, this.props.sortedBy, this.props.isAsc)).slice(((this.props.activePage * this.props.perPage) - this.props.perPage), (this.props.activePage * this.props.perPage)).length === 0 &&
                    <tr>
                        <td colSpan={(this.props.serialNumber && this.props.actionField) ?(this.props.headerList.length + 2):
                            (
                                (this.props.serialNumber && !this.props.actionField)||(!this.props.serialNumber && this.props.actionField)
                            ) ?
                                (this.props.headerList.length+1):this.props.headerList.length}
                            className="no-data">{this.props.noDataMessage ? this.props.noDataMessage : "No Data Found."}</td>
                    </tr>
                )}
            </tbody>
        )
    }
}

Tbody.propTypes = {
    headerList: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
    })).isRequired,
    sortedBy: PropTypes.string,
    searchQuery: PropTypes.string,
    list: PropTypes.array.isRequired,
    activePage: PropTypes.number,
    filterBySearch: PropTypes.func,
    perPage: PropTypes.number,
    sortList: PropTypes.func,
    isAsc: PropTypes.bool,
    actionsList: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string,
        handleAction: PropTypes.func
    })),
    noDataMessage: PropTypes.string,
    pagination: PropTypes.bool,
    actionField: PropTypes.bool,
    serialNumber: PropTypes.bool,
    handleRowClick: PropTypes.func.isRequired
};

export default Tbody;