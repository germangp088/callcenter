import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Product from '../../../common/Product';

const ProductOrder = (props) => {
    const { product, removeToCart, symbol } = props;
    return (
        <React.Fragment>
            <Product
                product={product}
                symbol={symbol}
            >
                <IconButton
                    color="primary"
                    aria-label="remove to shopping cart"
                    onClick={() => {
                        removeToCart(product.id);
                    }}>
                    <RemoveShoppingCartIcon />
                </IconButton>
            </Product>
        </React.Fragment>
    );
}

export default ProductOrder;