import React, { memo } from 'react';
import PropTypes from 'prop-types';
import "./Display.css"

const Display = ({ value }) => {
    // Format number with commas for better readability
    const formatValue = (val) => {
        if (val === null || val === undefined) return "0";
        
        // Handle special cases
        if (["Infinity", "Error"].includes(val)) return val;
        
        const parts = val.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join('.');
    };

    const formattedValue = formatValue(value);
    const isLongNumber = formattedValue.length > 12;

    return (
        <div className="component-display" role="textbox" aria-label="Calculator display">
            <div 
                className={`display-value ${isLongNumber ? 'small-text' : ''}`}
                data-testid="display-value"
            >
                {formattedValue}
            </div>
            <div className="display-shadow"></div>
        </div>
    );
};

Display.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

Display.defaultProps = {
    value: "0"
};

export default memo(Display);