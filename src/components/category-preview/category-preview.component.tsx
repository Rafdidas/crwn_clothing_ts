import { FC } from 'react';

import { CategoryPreviewContainer, CategoryTitle } from './category-preview.styles';

import ProductCard from '../product-card/product-card.component';
import { CategoryItem } from '../../store/categories/category.types';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
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