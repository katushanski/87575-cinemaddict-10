const createFilterMarkup = (filter) => {
  const {title, count, source, isCountable, isActive, isAdditional} = filter;

  return `<a href="#${source}" class="main-navigation__item main-navigation__item${isActive ? `--active` : ``}${isAdditional ? `--additional` : ``}">${title} ${isCountable ? `<span class="main-navigation__item-count">${count}</span></a>` : `</a>`}`;
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return `<nav class="main-navigation">
    ${filtersMarkup}
  </nav>`;
};

export {createFilterTemplate};
