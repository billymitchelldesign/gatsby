import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Masonry from "react-masonry-css"

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
}

//Return an image if there is one, else just the title
const IfFeaturedImage = function (node) {
  if (node.data.Featured_Image_URL) {
    return (
      <>
        <img
          className="fluid"
          id={node.recordId}
          src={`https://res.cloudinary.com/billymitchell/image/upload/c_mfit,f_auto,q_auto:good,w_600,fl_progressive/${node.data.Featured_Image_URL}`}
          alt={node.data.Project_Title}
        />
        <p className="title">
          <strong>{node.data.Project_Title}</strong>
        </p>
      </>
    )
  } else {
    return (
      <p className="title-no-featured-image">
        <strong>{node.data.Project_Title}</strong>
      </p>
    )
  }
}

export const query = graphql`
query ($Creative_Discipline: String!) {
  allAirtable(
    filter: {
      table: { eq: "Project" }
      data: { Creative_Discipline: { eq: $Creative_Discipline } }
    }
  ) {
    nodes {
      recordId
      data {
        Project_Title
        Featured_Image_URL
        Creative_Discipline
        End_Date(formatString: "MM-YYYY")
        slug
      }
    }
  }
}
`

const PortfolioDisplayALL = ({data}, clickedValue) => (
    <div className="portfolio-item-container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.allAirtable.nodes.map(node => (
            <div
              key={node.recordId}
              id={node.recordId}
              className="portfolio-item"
            >
              <Link to={`/portfolio/${node.data.slug}`}>
                {IfFeaturedImage(node)}
              </Link>
            </div>
          ))}
        </Masonry>
      </div>
)

export default PortfolioDisplayALL