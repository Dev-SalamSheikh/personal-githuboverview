/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

const Pagination = ({ totalPosts, postsPerPage, paginate, currentPage }) => {
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
              <span onClick={(e) => paginate(page, e)}>
                <a
                  style={{
                    backgroundColor: "goldenrod",
                    borderTop: "none",
                    borderBottom: "none",
                    color: "white",
                  }}
                  className={`${
                    page === currentPage ? "active" : ""
                  } page-link`}
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
