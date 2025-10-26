const renderDeleteProfileDialogHTML = () => `
  <dialog is="basis-dialog" class="u-fc u-gap u-p">
    <h2>Delete account</h2>
    <div>Are you sure you want to delete your account?</div>
    <div class="u-fr u-gap">
      <button data-name="delete-profile" type="button" class="c-button c-button--danger">Delete</button>
      <button data-name="delete-profile-cancel" type="button" class="c-button c-button--secondary">Cancel</button>
    </div>
  </dialog>
`;

export default renderDeleteProfileDialogHTML;
