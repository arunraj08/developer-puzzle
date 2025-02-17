import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  priceQueryAdapter,
  PriceQueryState,
  PRICEQUERY_FEATURE_KEY
} from './price-query.reducer';

const getPriceQueryState = createFeatureSelector<PriceQueryState>(
  PRICEQUERY_FEATURE_KEY
);

export const getSelectedSymbol = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => state.selectedSymbol
);

export const getError = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => state.error
);

const { selectAll } = priceQueryAdapter.getSelectors();

export const getAllPriceQueries = createSelector(
  getPriceQueryState,
  selectAll
);
