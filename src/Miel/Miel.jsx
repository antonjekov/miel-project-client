import React, { useEffect, useState } from 'react';
import styles from './Miel.module.css';
import MielCard from "../MielCard/MielCard";
import { CardColumns} from 'react-bootstrap';
import categoryService from "../services/category_service";

function Miel(props) {

    const categoryName = props.category;
    const [category, setCategory] = useState({});
    useEffect(() => {
        async function fetchData() {
            const allCategory = await categoryService.getAll().then(res => res.json())

            const categoryInfo = allCategory.find(x => x.name === categoryName)
            setCategory(categoryInfo)
        }
        fetchData()
    }, [categoryName]);

    return (
        <div className={styles.Miel}>
            <div className={styles.CategoryImage}>
                <img src={category.imageUrl} alt="Category" ></img>
            </div>
            <CardColumns>
                {props.subcategories.map(subcategory => <MielCard key={subcategory._id} subcategory={subcategory} category={category} />)}
            </CardColumns>
        </div >);
}

export default Miel;