/* eslint-disable react/prop-types */
const Layout = ({
  children
}) => {
  return (
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-6 mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout