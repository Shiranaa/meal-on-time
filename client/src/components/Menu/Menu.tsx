import React from "react";
import { getRequest } from "../../services/apiService";
import Card, { CardType } from "../Card/Card";
import Message from "../Message/Message";
import Title from "../Title/Title";
import "./Menu.css";

export enum displayMode {
  grid = "grid",
  list = "list",
}

enum Categories {
  all = "all",
  chicken = "chicken",
  vegeterian = "vegeterian",
  asian = "asian",
}

interface MenuProps {
  defaultDisplay: displayMode;
}

interface MenuState {
  display: displayMode;
  cards: Array<CardType>;
  filteredByCategory: Array<CardType>;
  selectedCategory: string;
  categories: Array<string>;
  sortDir: 1 | -1;
  fileName: string | null;
}

class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);

    this.state = {
      display: props.defaultDisplay,
      cards: [],
      filteredByCategory: [],
      selectedCategory: Categories.all,
      categories: Object.values(Categories),
      sortDir: 1,
      fileName: null,
    };
  }

  componentDidMount() {
    const res = getRequest("cards/");
    if (!res) {
      return;
    }

    res
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          cards: json,
          filteredByCategory: json,
        }));
      });
  }

  sortDishes = () => {
    const newDir = this.state.sortDir === 1 ? -1 : 1;

    this.setState(() => ({
      sortDir: newDir,
    }));

    const res = getRequest(`cards/sort/${newDir}`);
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        const filtered = this.filterByCategory(this.state.selectedCategory, [
          ...json,
        ]);

        this.setState(() => ({
          cards: json,
          filteredByCategory: filtered,
        }));
      });
  };

  changeDisplay = (mode: displayMode) => {
    this.setState((state, props) => ({
      display: mode,
    }));
  };

  filterByCategory = (
    category: string,
    cards: Array<CardType>
  ): Array<CardType> => {
    if (category === Categories.all) {
      return cards;
    }

    return cards.filter((card) => {
      return card.category === category;
    });
  };

  categoryChange = (selected: string) => {
    const filtered = this.filterByCategory(selected, [...this.state.cards]);

    this.setState((state, props) => ({
      filteredByCategory: filtered,
      selectedCategory: selected,
    }));
  };

  displayBtnCss = (mode: displayMode): string => {
    return mode === this.state.display ? "btn-secondary" : "btn-default";
  };

  export = () => {
    const res = getRequest(
      `cards/export?category=${this.state.selectedCategory}`
    );
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        this.setState(() => ({
          fileName: json.name,
        }));
      });
  };

  closeMessage = () => {
    this.setState(() => ({
      fileName: null,
    }));
  };

  render() {
    // conditional rendering - if no dishes display an empty page
    if (this.state.filteredByCategory.length === 0)
      return <p>No dishes in menu</p>;

    return (
      <>
        <Title text="Order Delivery or Takeaway" />

        <div className="d-flex justify-content-between px-5">
          <div className="d-flex align-items-center">
            <label className="pe-2">Category:</label>
            <select
              onChange={(e) => this.categoryChange(e.target.value)}
              value={this.state.selectedCategory}
              className="form-select text-capitalize"
            >
              {this.state.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button onClick={this.sortDishes} className="btn btn-default mx-4">
              Name {this.state.sortDir === 1 ? "(A-Z)" : "(Z-A)"}
            </button>

            <button
              onClick={(e) => this.changeDisplay(displayMode.list)}
              className={`btn ${this.displayBtnCss(displayMode.list)}`}
            >
              <i className="bi-list-ul"></i>
            </button>
            <button
              onClick={(e) => this.changeDisplay(displayMode.grid)}
              className={`btn ${this.displayBtnCss(displayMode.grid)}`}
            >
              <i className="bi-grid-3x3-gap-fill"></i>
            </button>
          </div>

          <div>
            <button onClick={this.export} className="btn btn-primary">
              Export
            </button>
          </div>
        </div>

        {this.state.fileName && (
          <Message
            fileName={this.state.fileName}
            handleClick={this.closeMessage}
          />
        )}

        <div className={this.state.display}>
          {this.state.filteredByCategory.map((card) => (
            <Card
              key={card._id}
              data={card}
              categoryChange={this.categoryChange}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Menu;
