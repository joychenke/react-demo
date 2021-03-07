import  React from 'react'
import "./searchDemo.css"
const res = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const getData = () => {
  return new Promise(resolve => {
    const data = [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ];
    setTimeout(() => {
      return resolve(data)
    }, 2000);
  })
}
// 整个示例应用的整体
class FilterableProductTable extends React.Component{
  constructor(props) {
    super(props);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this)
    this.state = {
      resultData : [],
      filterText: "",
      inStockOnly: false
    }
  }
  handleOnCheck(value) {
    this.setState({
      inStockOnly: value
    })
  }
  handleOnSearch(value) {
    this.setState({
      filterText: value
    })
  }
  componentDidMount() {
    getData().then(res => {
      this.setState({
        resultData: res
      })
    })
  }
  render() {
    const resultData = this.state.resultData
    if(!resultData.length){
      return  <SearchBar 
      filterText={this.state.filterText} 
      inStockOnly={this.state.inStockOnly}
      onCheck={this.handleOnCheck}
      onSearch={this.handleOnSearch}
      />
    }
    const productsObj = resultData.reduce((obj, item) => {
      if(!Object.keys(obj).length || !obj[item.category]) {
        obj[item.category] = [item]
        return obj
      }
      obj[item.category].push(item)
      return obj
    }, {})
    return (
      <div>
        <SearchBar 
        filterText={this.state.filterText} 
        inStockOnly={this.state.inStockOnly}
        onCheck={this.handleOnCheck}
        onSearch={this.handleOnSearch}
        />
        <ProductTable 
        productsObj={productsObj}
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

// 接受所有的用户输入
class SearchBar extends React.Component{
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }
  handleSearch(ev) {
    this.props.onSearch(ev.target.value)
  }
  handleCheck(ev) {
    this.props.onCheck(ev.target.checked)
  }
  render() {
    return (
      <div>
        {/* 没有写constructor，是否可用props */}
        <input type="text" value={this.props.filterText} onChange={this.handleSearch}></input>
        <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleCheck}></input>
      </div>
    );
  }
}

// 展示数据内容并根据用户输入筛选结果
class ProductTable extends React.Component{
  render() {
    const { productsObj, filterText, inStockOnly } = this.props
    const tableContent = Object.keys(productsObj).map(category => {
      const filterData = productsObj[category].filter(item => {
        // 根据 是否勾选和输入的内容
        if(!inStockOnly){
          return item.name.toLowerCase().includes(filterText)
        }else {
          return item.stocked && item.name.toLowerCase().includes(filterText)
        }
      })
      if(!filterData.length){
        return null
      }
      const productList = filterData.map(item => <ProductRow name={item.name} price={item.price} key={item.name}></ProductRow>)
      return (
        <div key={category}>
          <ProductCategoryRow title={category}/>
          {productList}
        </div>
      );
    })
    return (
      <div className="table">
        <div className="table-title">
          <span>Name</span>
          <span>Price</span>
        </div>
        <div className="table-content">
          {tableContent}
        </div>
      </div>
    );
  }
}

//  为每一个产品类别展示标题
class ProductCategoryRow extends React.Component{
  render() {
    return (
    <div 
      className="productTitle">
      {this.props.title}
    </div>);
  }
}

// 每一行展示一个产品
class ProductRow extends React.Component{
  render() {
    return (
      <div className="productRow">
        <div className="productRow-left">{this.props.name}</div>
        <div className="productRow-right">{this.props.price}</div>
      </div>
    );
  }
}

export default FilterableProductTable
