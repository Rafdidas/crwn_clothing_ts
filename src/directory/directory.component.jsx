import CategoryItem from "../components/category-item/category-item.component";
import './category.style.scss';

const Directory = ({categories}) => {
    return (
        <div className="directory-container">
            {
            categories.map((category) => {
                return (
                <CategoryItem key={category.id} category={category} />
                )
            })
            }
        </div>
    );
}

export default Directory;