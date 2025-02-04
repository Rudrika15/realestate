import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light rounded-top p-4">
                    <div className="row">
                        <div className="col-12 col-sm-6 text-center text-sm-start">
                            &copy; {year} <a href="#">Real estate ac app</a> All Right Reserved.
                        </div>
                        <div className="col-12 col-sm-6 text-center text-sm-end">
                            {/* Designed By <a href="https://htmlcodex.com">HTML Codex</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer