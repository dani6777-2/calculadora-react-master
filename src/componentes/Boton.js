import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Boton.css';

const Boton = ({ clickHandle, name, red, orange, wide, green }) => {
    const handleClick = React.useCallback(() => {
        clickHandle(name);
    }, [clickHandle, name]);

    const className = React.useMemo(() => {
        return [
            'component-button',
            red ? 'red' : '',
            orange ? 'orange' : '',
            wide ? 'wide' : '',
            green ? 'green' : '',
        ].filter(Boolean).join(' ');
    }, [red, orange, wide, green]);

    return (
        <div className={className}>
            <button
                className="btn"
                onClick={handleClick}
                aria-label={`Calculator button ${name}`}
                type="button"
                data-testid={`button-${name}`}
            >
                {name}
            </button>
        </div>
    );
};

Boton.propTypes = {
    clickHandle: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    red: PropTypes.bool,
    orange: PropTypes.bool,
    wide: PropTypes.bool,
    green: PropTypes.bool
};

Boton.defaultProps = {
    red: false,
    orange: false,
    wide: false,
    green: false
};

export default memo(Boton);
