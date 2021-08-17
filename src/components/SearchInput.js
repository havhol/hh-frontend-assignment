import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SearchInput.module.css';
import SearchIcon from './SearchIcon';
import clearIcon from '../assets/cross.svg';

const SearchInput = (props) => {
  const { handleChange, handleSubmit, value, populated, clearInput } = props;
  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Search"
          aria-label="Search"
          value={value || ''}
          onChange={handleChange}
        />
        {populated && (
          <button
            className={clsx(styles.iconButton, styles.clearButton)}
            onClick={clearInput}
            type="reset"
          >
            <img src={clearIcon} />
          </button>
        )}

        <button
          type="button"
          className={clsx(
            styles.iconButton,
            styles.searchIcon,
            populated ? styles.searchIconActive : ''
          )}
          onClick={handleSubmit}
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

SearchInput.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  value: PropTypes.string,
  populated: PropTypes.bool,
  clearInput: PropTypes.func
};

export default SearchInput;
