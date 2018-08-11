import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Thead extends Component {
    render() {
        return (
            <thead className="data-table-thead">
            <tr>
                { this.props.serialNumber &&
                <th onClick={(e) => (this.props.sort ? this.props.handleSortedBy('sno', e) : e)}>
                    <span>S.No.</span>
                    {this.props.sort &&
                    <div className="head-icons">
                        <i className="material-icons up">arrow_drop_up</i>
                        <i className="material-icons down">arrow_drop_down</i>
                    </div>
                    }
                </th>
                }
                {this.props.sort && this.props.headerList.map((d, i) =>
                    <th key={i} onClick={(e) => (d.sort?this.props.handleSortedBy(d.value, e):e)} style={d.style ? d.style: ''}>
                        <span>{d.label}</span>
                        {d.sort && <div className="head-icons">
                            <i className="material-icons up">arrow_drop_up</i>
                            <i className="material-icons down">arrow_drop_down</i>
                        </div>
                        }
                    </th>
                )}
                {!this.props.sort &&  this.props.headerList.map((d, i) =>
                    <th key={i}>
                        <span>{d.label}</span>
                    </th>
                )}
                <th>Actions</th>
            </tr>
            </thead>
        )
    }
}


Thead.propTypes = {
    headerList: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        sort:PropTypes.bool,
        value: PropTypes.string.isRequired,
        style: PropTypes.object
    })).isRequired,
    sort: PropTypes.bool,
    handleSortedBy: PropTypes.func,
    serialNumber: PropTypes.bool
};

export default Thead;
