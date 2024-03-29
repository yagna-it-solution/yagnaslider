import { IYagnaColorPickerStyleProps, IYagnaColorPickerStyles } from './YagnaColorPicker.types';

export const getStyles = (props: IYagnaColorPickerStyleProps): IYagnaColorPickerStyles => {
  const { className, theme } = props;

  return {
    root: [
      'ms-ColorPicker',
      theme.fonts.medium,
      {
        position: 'relative',
        maxWidth: 200
      },
      className
    ],
    panel: [
      'ms-ColorPicker-panel',
      {
        padding: '16px'
      }
    ],
    table: [
      'ms-ColorPicker-table',
      {
        tableLayout: 'fixed',
        width: '100%',
        selectors: {
          'tbody td:last-of-type .ms-ColorPicker-input': {
            paddingRight: 0
          }
        }
      }
    ],
    tableHeader: [
      theme.fonts.small,
      {
        selectors: {
          td: {
            paddingBottom: 4
          }
        }
      }
    ],
    tableHexCell: [
      {
        width: '25%'
      }
    ],
    colorSquare: [
      'ms-ColorPicker-colorSquare',
      {
        width: 48,
        height: 48,
        margin: '0 0 0 8px',
        border: '1px solid #c8c6c4'
      }
    ],
    flexContainer: [
      {
        display: 'flex'
      }
    ],
    flexSlider: [
      {
        flexGrow: '1'
      }
    ],
    flexPreviewBox: [
      {
        flexGrow: '0'
      }
    ],
    input: [
      'ms-ColorPicker-input',
      {
        width: '100%',
        border: 'none',
        boxSizing: 'border-box',
        height: 30,
        selectors: {
          '&.ms-TextField': {
            paddingRight: 4
          },
          '& .ms-TextField-field': {
            minWidth: 'auto',
            padding: 5,
            textOverflow: 'clip'
          }
        }
      }
    ]
  };
};
