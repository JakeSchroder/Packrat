import AccountMenu from "../components/AccountMenu";
import CartMenu from "../components/CartMenu";
import FilterMenu from "../components/FilterMenu";
import SearchBar from "../components/SearchBar";

const PageHeader= ({splashText}) => {
    // navbar
        // search bar
        // cart/account
        // Logo
    // grid list of products
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar/>
        <AccountMenu/>
        <CartMenu/>
        <FilterMenu/>
      </header>
    </div>
  );
}

export default PageHeader;