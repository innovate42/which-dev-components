import React from "react"
import PropTypes from "prop-types"
import deburr from "lodash/deburr"
import Downshift from "downshift"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import Chip from "@material-ui/core/Chip"

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  )
}

renderInput.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired
}

function DownshiftMultiple({ classes, suggestions, label, placeholder, selectedItems, setSelectedItems }) {
  const [inputValue, setInputValue] = React.useState("")

  const handleKeyDown = event => {
    if (selectedItems.length && !inputValue.length && event.key === "Backspace") {
      setSelectedItems(selectedItems.slice(0, selectedItems.length - 1))
    }
  }

  function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    return inputLength === 0 && !showEmpty
      ? []
      : suggestions.filter(suggestion => {
          const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

          if (keep) {
            count += 1
          }

          return keep
        })
  }

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleChange = item => {
    let newSelectedItem = [...selectedItems]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue("")
    setSelectedItems(newSelectedItem)
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItems]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItems(newSelectedItem)
  }

  return (
    <Downshift id="downshift-multiple" inputValue={inputValue} onChange={handleChange} selectedItem={selectedItems}>
      {({ getInputProps, getItemProps, getLabelProps, isOpen, inputValue: inputValue2, selectedItem: selectedItem2, highlightedIndex }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: placeholder
        })

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              label: label,
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItems.map(item => (
                  <Chip key={item} tabIndex={-1} label={item} className={classes.chip} onDelete={handleDelete(item)} />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event)
                  onChange(event)
                },
                onFocus
              },
              inputProps
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )
      }}
    </Downshift>
  )
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}))

export function MultiSelect({ suggestions, label, placeholder, selectedItems, setSelectedItems }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <DownshiftMultiple
        classes={classes}
        label={label}
        placeholder={placeholder}
        suggestions={suggestions}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  )
}
