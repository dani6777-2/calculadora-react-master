import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from './Boton';
import './PanelDeBotones.css';

const PanelDeBotones = ({ clickHandle }) => {
    const buttonRows = [
        [
            { name: 'AC', props: { red: true } },
            { name: '+/-', props: {} },
            { name: '%', props: {} },
            { name: '/', props: { orange: true } }
        ],
        [
            { name: '7', props: {} },
            { name: '8', props: {} },
            { name: '9', props: {} },
            { name: 'x', props: { orange: true } }
        ],
        [
            { name: '4', props: {} },
            { name: '5', props: {} },
            { name: '6', props: {} },
            { name: '-', props: { orange: true } }
        ],
        [
            { name: '1', props: {} },
            { name: '2', props: {} },
            { name: '3', props: {} },
            { name: '+', props: { orange: true } }
        ],
        [
            { name: '0', props: {} },
            { name: '.', props: {} },
            { name: '=', props: { green: true } }
        ]
    ];

    const handleClick = useCallback((nombreDeBoton) => {
        clickHandle(nombreDeBoton);
    }, [clickHandle]);

    const handleKeyboardNavigation = useCallback((event, rowIndex, colIndex) => {
        const currentRow = buttonRows[rowIndex];
        
        switch(event.key) {
            case 'ArrowRight':
                if (colIndex < currentRow.length - 1) {
                    event.preventDefault();
                    document.querySelector(`[data-testid="button-${currentRow[colIndex + 1].name}"]`)?.focus();
                }
                break;
            case 'ArrowLeft':
                if (colIndex > 0) {
                    event.preventDefault();
                    document.querySelector(`[data-testid="button-${currentRow[colIndex - 1].name}"]`)?.focus();
                }
                break;
            case 'ArrowUp':
                if (rowIndex > 0) {
                    event.preventDefault();
                    const upButton = buttonRows[rowIndex - 1][Math.min(colIndex, buttonRows[rowIndex - 1].length - 1)];
                    document.querySelector(`[data-testid="button-${upButton.name}"]`)?.focus();
                }
                break;
            case 'ArrowDown':
                if (rowIndex < buttonRows.length - 1) {
                    event.preventDefault();
                    const downButton = buttonRows[rowIndex + 1][Math.min(colIndex, buttonRows[rowIndex + 1].length - 1)];
                    document.querySelector(`[data-testid="button-${downButton.name}"]`)?.focus();
                }
                break;
            default:
                break;
        }
    }, [buttonRows]);

    return (
        <div 
            className="component-button-panel"
            role="grid"
            aria-label="Calculator keypad"
        >
            {buttonRows.map((row, rowIndex) => (
                <div 
                    key={`row-${rowIndex}`}
                    className="button-row"
                    role="row"
                >
                    {row.map((button, colIndex) => (
                        <Button
                            key={button.name}
                            name={button.name}
                            clickHandle={handleClick}
                            onKeyDown={(e) => handleKeyboardNavigation(e, rowIndex, colIndex)}
                            {...button.props}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

PanelDeBotones.propTypes = {
    clickHandle: PropTypes.func.isRequired
};

export default memo(PanelDeBotones);
