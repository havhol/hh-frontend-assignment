import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SearchResult.module.css';
import downArrow from '../assets/down-arrow.svg';
import sortIcon from '../assets/sort.svg';

const SearchResult = (props) => {
  const {
    data,
    isSearching,
    handleActiveSearchResult,
    activeSearchResult,
    error,
    touched,
    handleSorting
  } = props;

  if (!touched) return null;
  if (error) return <p>Error</p>;
  if (isSearching) return <p>Searching...</p>;
  if (data.length == 0 && touched && !isSearching) return <p>No results</p>;

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={clsx(styles.tableRow, styles.tableRowHead)}>
            <th className={clsx(styles.tableCell, styles.tableCellHead)}>
              Ship ID
            </th>
            <th className={clsx(styles.tableCell, styles.tableCellHead)}>
              Passengers
              <button
                onClick={() => handleSorting('passengerCapacity')}
                className={styles.iconButton}
              >
                <img src={sortIcon} />
              </button>
            </th>
            <th className={clsx(styles.tableCell, styles.tableCellHead)}>
              Year
              <button
                onClick={() => handleSorting('yearOfConstruction')}
                className={styles.iconButton}
              >
                <img src={sortIcon} />
              </button>
            </th>
          </tr>
        </thead>
        {data.length > 0 && (
          <>
            {data.map((item, i) => {
              const {
                shipId,
                heading,
                passengerCapacity,
                yearOfConstruction,
                body
              } = item;
              // const activeItem = !!activeSearchResult.find(
              //   (x) => x.id === item.id
              // );

              const activeItem =
                activeSearchResult.filter((x) => x.shipId == shipId).length > 0;

              const getBodyText = () => {
                return { __html: body.slice(0, 300) };
              };

              return (
                <tbody
                  className={clsx(
                    styles.tbody,
                    activeItem ? styles.activeItem : ''
                  )}
                  key={`resultItem${i}`}
                >
                  <tr className={clsx(styles.tableRow)}>
                    <td className={styles.tableCell}>
                      <button
                        className={clsx(styles.iconButton)}
                        onClick={() => handleActiveSearchResult(item)}
                        aria-label="Open more content"
                      >
                        <img src={downArrow} />
                      </button>
                      <span>{shipId}</span>
                    </td>
                    <td className={styles.tableCell}>
                      {passengerCapacity || 'nn'}
                    </td>
                    <td className={styles.tableCell}>
                      {yearOfConstruction || 'nn'}
                    </td>
                  </tr>
                  <tr
                    className={clsx(
                      styles.tableRow,
                      styles.tableRowWithHiddenContent
                    )}
                  >
                    <td colSpan="3" className={styles.tableCell}>
                      <div className={styles.hiddenRowContent}>
                        <p className={styles.header}>{heading}</p>
                        {!!body ? (
                          <div dangerouslySetInnerHTML={getBodyText()} />
                        ) : (
                          <p>Text is missing</p>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </>
        )}
      </table>
    </div>
  );
};

SearchResult.propTypes = {
  data: PropTypes.array,
  isSearching: PropTypes.bool,
  handleActiveSearchResult: PropTypes.func,
  activeSearchResult: PropTypes.array,
  error: PropTypes.bool,
  touched: PropTypes.bool,
  handleSorting: PropTypes.func
};

export default SearchResult;
