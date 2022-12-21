/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

const Pagination = ({ totalPosts, postsPerPage, paginate }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page) => {
          return (
            <li
              key={page}
              className="page-item"
              style={{
                cursor: "pointer",
              }}
            >
              <span onClick={() => paginate(page)}>
                <a
                  className="page-link"
                  style={{
                    backgroundColor: "goldenrod",
                    borderTop: "none",
                    borderBottom: "none",
                    color: "white",
                  }}
                >
                  {page}
                </a>
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
