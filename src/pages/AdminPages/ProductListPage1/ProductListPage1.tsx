import { Col, Row, Form, Button } from "react-bootstrap";
import MessageBox from "../../../components/MessageBox.tsx";
import LoadingBox from "../../../components/LoadingBox.tsx";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery, useGetCategoriesQuery, useGetBrandsQuery } from "../../../hooks/productHooks.ts";
import { getError } from "../../../util.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { useState, useEffect } from "react";
import { Categories } from "../../UserPages/HomePage/components/Categories.tsx";
import { SearchSection } from "../../UserPages/HomePage/components/SearchSection.tsx";
import { Filters } from "../../UserPages/HomePage/components/Filters.tsx";
import { ProductList } from "./components/ProductList.tsx";
import { useNavigate } from "react-router-dom";


export function ProductListPage1() {
  // State for filters and pagination
  const [searchInput, setSearchInput] = useState<string>(''); // For user input
  const [name, setName] = useState<string>(''); // For API query
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('latest');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch products with filters
  const { data, isLoading, error } = useGetProductsQuery({
    searchQuery: name,
    category,
    brand: brand.join(','),
    sort,
    page,
    pageSize,
    minPrice,
    maxPrice,
  });

  // Fetch dynamic categories and brands
  const { data: categories } = useGetCategoriesQuery(brand.join(','));
  const { data: brands } = useGetBrandsQuery(category, name, minPrice, maxPrice);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setName(searchInput);
  };

  const handleApplyFilters = (filters: {
    sort: string;
    brand: string[];
    minPrice: number | null;
    maxPrice: number | null;
  }) => {
    setSort(filters.sort);
    setBrand(filters.brand);
    setMinPrice(filters.minPrice ?? null);
    setMaxPrice(filters.maxPrice ?? null);
    setPage(1);
  };

  const handleReset = () => {
    setSearchInput('');
    setName('');
    setCategory('');
    setBrand([]);
    setSort('latest');
    setMinPrice(null);
    setMaxPrice(null);
    setPage(1);
  };

  return (
    <div>
      <Helmet>
        <title>Amazona - Product List</title>
      </Helmet>
      <div className="flex justify-between w-9/12">
        <h1 className="h3">Products</h1>
        <Button className="m-2" onClick={() => navigate('create')}>
          Create New Product +
        </Button>
        <Button variant="secondary" className="m-2" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
      <Row className="mb-3 flex justify-center">
        <Col md={9}>
          <Categories category={category} setCategory={setCategory} categories={categories || []} />
          <SearchSection
            name={searchInput}
            setName={setSearchInput}
            handleSearch={handleSearch}
          />
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
          ) : (
            <ProductList products={data!.products} page={page} pages={data!.pages} setPage={setPage} />
          )}
        </Col>
        <Col md={3} className="p-3 bg-light text-dark rounded-2">
          <Filters
            sort={sort}
            setSort={setSort}
            brand={brand}
            setBrand={setBrand}
            brands={brands || []}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onApplyFilters={handleApplyFilters}
          />
        </Col>
      </Row>
    </div>
  );
}