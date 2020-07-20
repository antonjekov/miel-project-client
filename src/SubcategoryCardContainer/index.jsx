import React from 'react';
import styles from './index.module.css';
import SubcategoryCard from "../SubcategoryCard";
import { CardColumns} from 'react-bootstrap';
import { useAuth } from "../contexts/Auth";

function SubcategoryCardContainer(props) {

    const { categories } = useAuth()
    const categoryId = props.categoryId
    const category= categories?.find(x => x._id === categoryId);
    const subcategories =category&& category.subcategories

    const allCards =subcategories&& subcategories.map(subcategory => <SubcategoryCard key={subcategory._id} subcategory={subcategory} category={category} />)
    
    return (
        <div className={styles.Miel}>
            <div className={styles.CategoryImage}>
                <img src={category&&category.imageUrl} alt="Category" ></img>
            </div>
            <CardColumns>
                {allCards}
            </CardColumns>
        </div >);
}

export default SubcategoryCardContainer;