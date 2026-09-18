'use strict';

const th = document.querySelectorAll('th');

let ascending = true;
let previousIndex = null;

th.forEach((header) => {
  header.addEventListener('click', () => {
    document.querySelectorAll('th span').forEach((span) => {
      span.remove();
    });

    const index = Array.from(document.querySelectorAll('th')).indexOf(header);

    if (index === previousIndex) {
      ascending = !ascending;
    } else {
      ascending = true;
    }

    previousIndex = index;

    const rows = document.querySelectorAll('tbody tr');

    const rowsArray = Array.from(rows);

    const numberColumns = [2, 3];

    rowsArray.sort((a, b) => {
      const cellA = a.querySelectorAll('td')[index];
      const cellB = b.querySelectorAll('td')[index];

      if (numberColumns.includes(index)) {
        const valueA = Number(
          cellA.textContent.replace('$', '').replace(',', ''),
        );

        const valueB = Number(
          cellB.textContent.replace('$', '').replace(',', ''),
        );

        if (ascending) {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      } else {
        if (ascending) {
          return cellA.textContent.localeCompare(cellB.textContent);
        } else {
          return cellB.textContent.localeCompare(cellA.textContent);
        }
      }
    });

    const tbody = document.querySelector('tbody');

    rowsArray.forEach((row) => {
      tbody.append(row);
    });

    const newSpan = document.createElement('span');

    if (ascending) {
      newSpan.textContent = '↑';
    } else {
      newSpan.textContent = '↓';
    }

    header.append(newSpan);
  });
});
