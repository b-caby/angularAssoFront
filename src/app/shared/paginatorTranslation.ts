import { MatPaginatorIntl } from "@angular/material";

export default class PaginatorTranslation extends MatPaginatorIntl {
    itemsPerPageLabel = "Eléments par page";
    nextPageLabel = "Page suivante";
    previousPageLabel = "Page précédente";
    firstPageLabel = "Première page";
    lastPageLabel = "Dernière page";

    getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 sur ${length}`;
      }

      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    }
}
