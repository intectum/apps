import renderHeaderHTML from '../components/header.template';
import renderFilterSvg from '../icons/filter';

const renderPageHTML = () => `
  <div data-require-auth="" class="u-cover-screen u-fc">
    ${renderHeaderHTML()}
    <main data-init="admin" class="u-container u-w--full u-fc u-gap">
      <h1>Admin</h1>
      <div class="u-fr u-align--center u-gap">
        ${renderFilterSvg()}
        <div class="u-fr u-gap--sm">
          <input type="checkbox" id="review" name="review" />
          <label for="review">Review required</label>
        </div>
      </div>
      <table style="text-align: left;">
        <thead>
          <tr>
            <th class="u-p--sm">Image</th>
            <th class="u-p--sm">Name</th>
            <th class="u-p--sm">Email</th>
            <th class="u-p--sm">Contact details</th>
            <th class="u-p--sm">Groups attended</th>
            <th class="u-p--sm"></th>
          </th>
        </thead>
        <tbody>
        </tbody>
      </table>
    </main>
  </div>
`;

export default renderPageHTML;
