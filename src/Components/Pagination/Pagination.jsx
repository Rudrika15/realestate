import React from 'react'
import { Link } from 'react-router-dom'

function Pagination() {
    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                    <li className="page-item">
                        <button className="page-link" to="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span> Previous
                        </button>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="#">1</Link>
                    </li>
                    <li className="page-item">
                        <button className="page-link" to="#" aria-label="Next">
                            Next <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination
