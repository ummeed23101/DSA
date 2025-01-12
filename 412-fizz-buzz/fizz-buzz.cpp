class Solution {
public:

void generateFizzBuzz(int n, vector<string> &ans){
    
    for(int i=1; i<=n; i++){
        
        if(i%3==0 && i%5==0){
            ans.push_back("FizzBuzz");
            continue;
        }
        if(i%3==0) {
            ans.push_back("Fizz");
            continue;}
        if(i%5==0) {
            ans.push_back("Buzz");
            continue;
        }
        string st = to_string(i);
        ans.push_back(st);
    }
}
    vector<string> fizzBuzz(int n) {
        vector<string> ans; 
        generateFizzBuzz(n, ans);

        return ans;
    }
};