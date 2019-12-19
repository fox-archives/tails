<div class="bg-gray-100">
  <ul class="flex flex-row items-center p-2">
    <li class="text-gray-800 text-xl mx-2">
      <h1>tails</h1> 
    </li>
    {#each navItems as item}
    <NavItem navItem={item}/>
    {/each}
      <button class="ml-auto px-2 py-1 rounded bg-orange-100 border-2 border-orange-500
        hover:bg-orange-200"
      >
     <div class="flex flex-row item-center">
        <svg class="mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <p>new project</p>
    </div> 
      </button> 
  </ul>
</div>

<script>
import NavItem from '@/components/NavItem';

let navItems = [
  {
    name: 'projects',
    route: 'projects'
  }
]
</script>
