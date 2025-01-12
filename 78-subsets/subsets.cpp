class Solution {
public:

int makeSubsets(int i, vector<int> &nums, vector<int> currAnswer, set<vector<int>> &answer)
{
    if (i == nums.size())
    {
        answer.insert(currAnswer);
        return 0;
    }
    makeSubsets(i + 1, nums, currAnswer, answer);
    currAnswer.push_back(nums[i]);
    makeSubsets(i + 1, nums, currAnswer, answer);

    return 0;
}
    vector<vector<int>> subsets(vector<int>& nums) {
        set<vector<int>> answer;
    vector<int> currAnswer;
    makeSubsets(0, nums, currAnswer, answer);
    vector<vector<int>> solution(answer.begin(), answer.end());

    return solution;
    }
};