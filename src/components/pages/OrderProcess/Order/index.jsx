import React from 'react';
import { AppConsumer } from "../../../../context";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Product from './Product';
import Item from '../../../common/Item';
import Currency from './Currency';
import exchange from '../../../common/exchange';

const useStyles = makeStyles((theme) => ({
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Order = () => {
  const classes = useStyles();

  return (
    <AppConsumer>
      {value => {
        const { cart, removeToCart, subTotal, shipping_fee, total, currencies, currency, changeCurrency } = value;

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Order summary
                </Typography>
                <Currency
                  currencies={currencies}
                  currency={currency}
                  changeCurrency={changeCurrency} />
                <List disablePadding>
                  {cart.map((product) => (
                    <Product
                      key={`Order_${product.id}`}
                      product={product}
                      removeToCart={removeToCart}
                      symbol={currency.symbol}
                    />
                  ))}
                  <Item
                    primary="Sub Total"
                    variant="subtitle1"
                    price={`${currency.symbol}${exchange(subTotal, currency.symbol)}`}
                  />
                  <Item
                    primary="Shipping"
                    variant="subtitle1"
                    price={`${currency.symbol}${exchange(shipping_fee, currency.symbol)}`}
                  />
                  <Item
                    primary="Total"
                    variant="subtitle1"
                    className={classes.total}
                    price={`${currency.symbol}${exchange(total, currency.symbol)}`}
                  />
                </List>
            </React.Fragment>
            );
        }}
    </AppConsumer>
  );
}

export default Order;