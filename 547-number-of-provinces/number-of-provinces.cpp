class Solution {
public:

    void dfsHelper(int node, vector<vector<int>>& isConnected, vector<int> &visited, int n){
        visited[node]=1;

        for(int i =0; i<n; i++){
            if(isConnected[node][i] && !visited[i]){
                dfsHelper(i, isConnected, visited, n);
            }
        }

    }
    int findCircleNum(vector<vector<int>>& isConnected) {
       
        int counterRes=0;
        int n=isConnected.size();
        vector<int> visited (n,0);
        for(int i =0; i<n; i++){
            if(visited[i]!=1){
                counterRes= counterRes+1;
                dfsHelper(i, isConnected,visited,n);
            }
        }

        return counterRes;
    }
};