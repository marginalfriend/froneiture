import { ProductDetail } from "./components/product-detail";

const AmericanClassicPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const productId = (await params).id;

	return <ProductDetail productId={productId} />
};

export default AmericanClassicPage;
