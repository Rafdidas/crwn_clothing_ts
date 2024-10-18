import { CategoryPreviewContainer, CategoryTitle } from './category-preview.styles.jsx';

import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
    return (
      <CategoryPreviewContainer>
        <h2>
          <CategoryTitle to={title}>
            {title.toUpperCase()}
          </CategoryTitle>
        </h2>
        <div className="preview">
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      </CategoryPreviewContainer>
    );
}

export default CategoryPreview;