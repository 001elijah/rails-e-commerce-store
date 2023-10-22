require "test_helper"

class ReactUsersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get react_users_index_url
    assert_response :success
  end
end
