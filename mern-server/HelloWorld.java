class HelloWorld {
   public int f[];
    public int fi(int n){    
        if(n==0){
            return 0;
        }
        if(n==1){
          return 1;
        }
        else{
           f[0]=0;
           f[1]=1;
           return f[n-1]+f[n-2];
    }
    }
    public static void main(String[] args) {
       int n=4;
       HelloWorld h=new HelloWorld();
       System.out.println(h.fi(n));
      
    }
}