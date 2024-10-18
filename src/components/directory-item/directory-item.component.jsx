import { DirectoryItemContainer, BackgroundImage, DirectoryItemBody } from './directory-item.style';

import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {

    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route)

    return (
      <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage $imageUrl={imageUrl} />
        <DirectoryItemBody>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </DirectoryItemBody>
      </DirectoryItemContainer>
    );
}

export default DirectoryItem;