export default function AllUsers() {
  return (
    <div className="overflow-x-auto ml-3">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Make Admin</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
